library(readr)
library(stringr)
library(jsonlite)

df <- read_csv("data.csv")

df$Sector <- df$Sector %>%
  str_replace_all("[0-9]", "")

write_json(df, "data.json")


naics <- read_csv("naics_codes.csv") 
names(naics) <- c("title", "definition")
naics %>% write_json("naics.json")
