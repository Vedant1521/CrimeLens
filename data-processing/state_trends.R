library(ggplot2)
library(dplyr)
library(readr)
library(scales)

crimes <- read_csv("../data/ncrb_crimes.csv")

# Year-over-year total crime trend
yearly <- crimes %>%
  group_by(year) %>%
  summarise(total = sum(total_ipc_crimes, na.rm = TRUE))

ggplot(yearly, aes(x = year, y = total)) +
  geom_line(color = "#E63946", linewidth = 1.4) +
  geom_point(color = "#E63946", size = 3) +
  geom_area(fill = "#E63946", alpha = 0.1) +
  scale_y_continuous(labels = comma) +
  scale_x_continuous(breaks = unique(yearly$year)) +
  labs(
    title = "Year-over-Year Crime Trend in India",
    subtitle = "Total IPC Crimes Reported (NCRB)",
    x = "Year",
    y = "Total Crimes"
  ) +
  theme_minimal(base_size = 12) +
  theme(
    plot.title = element_text(face = "bold", size = 14),
    axis.text.x = element_text(angle = 45, hjust = 1)
  )

ggsave("plots/yearly_trend.png", width = 10, height = 5, dpi = 150)