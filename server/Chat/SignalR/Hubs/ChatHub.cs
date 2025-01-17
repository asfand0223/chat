using System.Collections.Concurrent;
using Microsoft.AspNetCore.SignalR;

namespace Chat.Chat
{
    public class ChatHub : Hub
    {
        public static Guid GroupId = Guid.NewGuid();
        private static readonly ConcurrentDictionary<Guid, HashSet<string>> GroupConnections =
            new();

        public async Task JoinGroup()
        {
            try
            {
                GroupConnections.AddOrUpdate(
                    GroupId,
                    _ => new HashSet<string> { Context.ConnectionId },
                    (_, existing) =>
                    {
                        existing.Add(Context.ConnectionId);
                        return existing;
                    }
                );
                await Groups.AddToGroupAsync(Context.ConnectionId, GroupId.ToString());
            }
            catch (Exception ex)
            {
                Console.WriteLine("JoinGroup: " + ex);
            }
        }

        public async Task GetConnectionIds()
        {
            try
            {
                if (GroupConnections.TryGetValue(GroupId, out var connections))
                {
                    await Clients
                        .Group(GroupId.ToString())
                        .SendAsync("ReceiveConnectionIds", connections.ToList());
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("GetConnectionIds: " + ex);
            }
        }

        public async Task SendMessage(string connectionId, string content)
        {
            try
            {
                await Clients.All.SendAsync("ReceiveMessage", connectionId, content);
            }
            catch (Exception ex)
            {
                Console.WriteLine("SendMessage: " + ex);
            }
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            try
            {
                foreach (var groupId in GroupConnections.Keys)
                {
                    GroupConnections.AddOrUpdate(
                        groupId,
                        _ => new HashSet<string>(),
                        (_, existing) =>
                        {
                            existing.Remove(Context.ConnectionId);
                            return existing;
                        }
                    );
                }

                if (GroupConnections.TryGetValue(GroupId, out var connections))
                {
                    connections.Remove(Context.ConnectionId);

                    if (connections.Count == 0)
                    {
                        GroupConnections.TryRemove(GroupId, out _);
                    }

                    await Clients
                        .Group(GroupId.ToString())
                        .SendAsync("RemoveConnectionId", Context.ConnectionId);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("OnDisconnectedAsync: " + ex.Message);
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}
