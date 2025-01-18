namespace Chat.Utils
{
    public static class ColourSelector
    {
        private static readonly Random rnd = new Random();
        private static readonly List<string> Colours = new List<string>
        {
            "#FF5733",
            "#33FF57",
            "#3357FF",
            "#FF33A6",
            "#FF8C33",
            "#33FFCC",
            "#8C33FF",
            "#FF33FF",
            "#33D4FF",
            "#FF5733",
            "#F9F871",
            "#FF7B00",
            "#FFD700",
            "#1E90FF",
            "#FF6347",
            "#00FF7F",
            "#7FFF00",
            "#C71585",
            "#8A2BE2",
            "#00CED1",
            "#FF1493",
            "#00BFFF",
            "#D2691E",
            "#D32F2F",
            "#F44336",
            "#9C27B0",
            "#3F51B5",
            "#2196F3",
            "#4CAF50",
            "#FF9800",
            "#FF5722",
            "#607D8B",
            "#009688",
            "#3F8E7B",
            "#FFEB3B",
            "#9E9E9E",
            "#CDDC39",
            "#2196F3",
            "#FF4081",
            "#29B6F6",
            "#F57C00",
            "#0288D1",
            "#E91E63",
            "#FF5C8D",
            "#00E676",
            "#7C4DFF",
            "#304FFE",
            "#F44336",
        };

        public static string GetRandom()
        {
            Console.WriteLine(Colours.Count);
            int index = rnd.Next(0, Colours.Count);
            return Colours[index];
        }
    }
}
