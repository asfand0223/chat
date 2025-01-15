using Chat.DTOs;
using Chat.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Chat.Controllers
{
    [Route("[controller]")]
    public class MessagesController : ControllerBase
    {
        private readonly IMessageRepository _messageRepository;

        public MessagesController(IMessageRepository messageRepository)
        {
            _messageRepository = messageRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateMessageDTO createMessageDTO)
        {
            try
            {
                if (createMessageDTO == null || string.IsNullOrWhiteSpace(createMessageDTO.Content))
                {
                    return BadRequest("Invalid message data.");
                }
                await _messageRepository.CreateMessage(
                    createMessageDTO.GroupId,
                    createMessageDTO.UserId,
                    createMessageDTO.Content
                );
                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine("MessagesController - Create:" + ex);
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
    }
}
