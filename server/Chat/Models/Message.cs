using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Chat.Models
{
    public class Message
    {
        [JsonPropertyName("connection_id")]
        [Required]
        public required string ConnectionId { get; set; }

        [JsonPropertyName("group")]
        [Required]
        public required string Group { get; set; }

        [JsonPropertyName("content")]
        [Required]
        public required string Content { get; set; }

        [JsonPropertyName("colour")]
        [Required]
        public required string Colour { get; set; }
    }
}
