library(ggplot2)
library(dplyr)
library(tidyr)
library(readr)
library(viridis)

crimes <- read_csv("../data/ncrb_crimes.csv")

# Select top 10 states + key crime categories
crime_cats <- c("murder", "rape", "robbery", "kidnapping", "riots", "dacoity")

heatmap_data <- crimes %>%
  filter(state %in% (crimes %>%
    group_by(state) %>%
    summarise(t = sum(total_ipc_crimes)) %>%
    top_n(10, t) %>% pull(state))) %>%
  group_by(state) %>%
  summarise(across(all_of(crime_cats), sum, na.rm = TRUE)) %>%
  pivot_longer(-state, names_to = "crime_type", values_to = "count")

ggplot(heatmap_data, aes(x = crime_type, y = state, fill = count)) +
  geom_tile(color = "white", linewidth = 0.4) +
  scale_fill_viridis(option = "C", labels = comma, name = "Cases") +
  labs(
    title = "Crime Category Heatmap — Top 10 States",
    subtitle = "Darker = Higher crime count",
    x = "Crime Type",
    y = NULL
  ) +
  theme_minimal(base_size = 11) +
  theme(
    plot.title = element_text(face = "bold", size = 14),
    axis.text.x = element_text(angle = 30, hjust = 1)
  )

ggsave("plots/crime_heatmap.png", width = 10, height = 7, dpi = 150)