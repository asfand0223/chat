using System.Text.Json.Serialization;

namespace Chat.DTOs
{
    public class CreateMessageDTO
    {
        [JsonPropertyName("user_id")]
        [JsonRequired]
        public Guid UserId { get; set; }

        [JsonPropertyName("group_id")]
        [JsonRequired]
        public Guid GroupId { get; set; }

        [JsonPropertyName("content")]
        [JsonRequired]
        public string? Content { get; set; }
    }
}
