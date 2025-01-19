using System.Collections.Concurrent;
using Chat.Utils;
using Microsoft.AspNetCore.SignalR;

namespace Chat.SignalR
{
    public class ChatHub : Hub
    {
        private static readonly ConcurrentDictionary<string, HashSet<Chatter>> ChatterGroups =
            new();

        public async Task JoinGroup(string group)
        {
            try
            {
                Chatter newChatter = new Chatter
                {
                    Group = group,
                    ConnectionId = Context.ConnectionId,
                    Colour = ColourSelector.GetRandom(),
                };

                ChatterGroups.AddOrUpdate(
                    group,
                    _ => new HashSet<Chatter> { newChatter },
                    (_, existing) =>
                    {
                        Chatter? existingChatter = existing.FirstOrDefault(
                            (Chatter c) => c.ConnectionId == newChatter.ConnectionId
                        );
                        if (existingChatter == null)
                            existing.Add(newChatter);
                        return existing;
                    }
                );
                await Groups.AddToGroupAsync(Context.ConnectionId, group);

                await ChatterJoined(group, newChatter);
            }
            catch (Exception ex)
            {
                Console.WriteLine("JoinGroup: " + ex);
            }
        }

        public async Task ChatterJoined(string group, Chatter chatter)
        {
            try
            {
                await Clients.Group(group).SendAsync("ChatterJoined", chatter);
                await SendChatters(group);
            }
            catch (Exception ex)
            {
                Console.WriteLine("ChatterJoined: " + ex);
            }
        }

        public async Task SendChatters(string group)
        {
            try
            {
                List<Chatter> chatters = ChatterGroups[group].ToList();
                await Clients.Client(Context.ConnectionId).SendAsync("ReceiveChatters", chatters);
            }
            catch (Exception ex)
            {
                Console.WriteLine("GetChatters: " + ex);
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
                // Find chatter that left
                Chatter? chatterToRemove = null;
                foreach (var cgs in ChatterGroups)
                {
                    chatterToRemove = cgs.Value.FirstOrDefault(
                        (Chatter c) => c.ConnectionId == Context.ConnectionId
                    );
                }
                // If chatter that left cannot be found, do nothing
                if (chatterToRemove == null)
                {
                    return;
                }
                // Remove chatter that left, from group
                ChatterGroups[chatterToRemove.Group]
                    .RemoveWhere((Chatter c) => c.ConnectionId == Context.ConnectionId);
                // Once chatter that left is removed, remove group if no chatters exist
                HashSet<Chatter> group = ChatterGroups[chatterToRemove.Group];
                if (group.Count == 0)
                {
                    ChatterGroups.Remove<string, HashSet<Chatter>>(
                        chatterToRemove.Group,
                        out HashSet<Chatter>? _
                    );
                }
                await Clients
                    .Group(chatterToRemove.Group)
                    .SendAsync("RemoveChatter", chatterToRemove.ConnectionId);
                //To be safe, call base OnDisconnectedAsync too
                await base.OnDisconnectedAsync(exception);
            }
            catch (Exception ex)
            {
                Console.WriteLine("OnDisconnectedAsync: " + ex.Message);
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}
