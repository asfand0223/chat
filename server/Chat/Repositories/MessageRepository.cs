using Chat.Database;
using Chat.Interfaces;
using Chat.Models;
using Microsoft.EntityFrameworkCore;

namespace Chat.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private ApplicationDbContext _context;

        public MessageRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreateMessage(Guid groupId, Guid userId, string content)
        {
            if (_context.Messages == null)
                throw new InvalidOperationException("Posts DbSet is null.");
            Message message = new Message
            {
                Id = Guid.NewGuid(),
                GroupId = groupId,
                UserId = userId,
                Content = content,
            };
            await _context.Messages.AddAsync(message);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Message>?> GetAllMessages()
        {
            if (_context.Messages == null)
                throw new InvalidOperationException("Posts DbSet is null.");
            return await _context.Messages.ToListAsync();
        }
    }
}
