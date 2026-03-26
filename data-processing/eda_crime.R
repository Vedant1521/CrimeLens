library(ggplot2)
library(dplyr)
library(readr)
library(scales)

# Load data
crimes <- read_csv("../data/ncrb_crimes.csv")

# Top 10 states by total IPC crimes
top_states <- crimes %>%
  group_by(state) %>%
  summarise(total_crimes = sum(total_ipc_crimes, na.rm = TRUE)) %>%
  arrange(desc(total_crimes)) %>%
  head(10)

# Bar chart — Top 10 states
ggplot(top_states, aes(x = reorder(state, total_crimes), y = total_crimes)) +
  geom_bar(stat = "identity", fill = "#E63946", width = 0.7) +
  geom_text(aes(label = comma(total_crimes)), hjust = -0.1, size = 3.2, color = "#333333") +
  coord_flip() +
  scale_y_continuous(labels = comma, expand = expansion(mult = c(0, 0.15))) +
  labs(
    title = "Top 10 States by Total IPC Crimes",
    subtitle = "Source: NCRB Annual Reports",
    x = NULL,
    y = "Total IPC Crimes"
  ) +
  theme_minimal(base_size = 12) +
  theme(
    plot.title = element_text(face = "bold", size = 14),
    panel.grid.major.y = element_blank()
  )

ggsave("plots/top_states_crime.png", width = 10, height = 6, dpi = 150)