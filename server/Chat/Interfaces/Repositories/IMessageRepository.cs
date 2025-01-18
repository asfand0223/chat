using Chat.Models;

namespace Chat.Interfaces
{
    public interface IMessageRepository
    {
        public Task<List<Message>?> GetAllMessages();
        public Task CreateMessage(Guid groupId, Guid userId, string content);
    }
}
