using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Chat.SignalR
{
    public class Chatter
    {
        [JsonPropertyName("group")]
        [Required]
        public required string Group { get; set; }

        [JsonPropertyName("connection_id")]
        [Required]
        public required string ConnectionId { get; set; }

        [JsonPropertyName("colour")]
        [Required]
        public required string Colour { get; set; }
    }
}
