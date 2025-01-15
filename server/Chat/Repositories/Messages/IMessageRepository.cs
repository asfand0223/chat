using Chat.Models;

namespace Chat.Repositories
{
    public interface IMessageRepository
    {
        public Task<List<Message>?> GetAllMessages();
        public Task CreateMessage(Guid groupId, Guid userId, string content);
    }
}
