using Microsoft.AspNetCore.SignalR;

namespace Chat.Chat
{
    public class ChatHub : Hub
    {
        public static Guid GroupId = Guid.NewGuid();

        public async Task JoinGroup()
        {
            try
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, GroupId.ToString());
            }
            catch (Exception ex)
            {
                Console.WriteLine("JoinGroup: ", ex);
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
                Console.WriteLine("SendMessage: ", ex);
            }
        }
    }
}
