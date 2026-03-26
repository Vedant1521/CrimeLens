library(ggplot2)
library(dplyr)
library(readr)
library(corrplot)

crimes  <- read_csv("../data/ncrb_crimes.csv")
literacy <- read_csv("../data/state_literacy.csv")

# Merge on state
merged <- crimes %>%
  group_by(state) %>%
  summarise(
    total_crimes     = sum(total_ipc_crimes, na.rm = TRUE),
    murder           = sum(murder, na.rm = TRUE),
    rape             = sum(rape, na.rm = TRUE),
    kidnapping       = sum(kidnapping, na.rm = TRUE)
  ) %>%
  left_join(literacy, by = "state") %>%
  na.omit()

# Scatter — literacy vs crime rate
ggplot(merged, aes(x = literacy_rate, y = total_crimes, label = state)) +
  geom_point(color = "#E63946", size = 3, alpha = 0.8) +
  geom_smooth(method = "lm", se = TRUE, color = "#333333", linetype = "dashed") +
  geom_text(vjust = -0.8, size = 2.8, color = "#555555") +
  scale_y_continuous(labels = scales::comma) +
  labs(
    title = "Literacy Rate vs Total Crimes by State",
    subtitle = "Does higher literacy mean lower crime?",
    x = "Literacy Rate (%)",
    y = "Total IPC Crimes"
  ) +
  theme_minimal(base_size = 12) +
  theme(plot.title = element_text(face = "bold", size = 14))

ggsave("plots/literacy_vs_crime.png", width = 10, height = 6, dpi = 150)

# Correlation matrix
cor_data <- merged %>% select(total_crimes, murder, rape, kidnapping, literacy_rate)
cor_matrix <- cor(cor_data, use = "complete.obs")

png("plots/correlation_matrix.png", width = 800, height = 700)
corrplot(cor_matrix,
  method = "color", type = "upper",
  tl.col = "black", tl.cex = 0.9,
  addCoef.col = "black", number.cex = 0.8,
  col = colorRampPalette(c("#E63946", "white", "#457B9D"))(200),
  title = "Crime Metrics Correlation Matrix",
  mar = c(0, 0, 2, 0)
)
dev.off()