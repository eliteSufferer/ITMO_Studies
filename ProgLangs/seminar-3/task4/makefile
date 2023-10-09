# Путь до исходных файлов
SRC_PATH = ./src
# Путь, где будут храниться скомпилированные .class файлы
BIN_PATH = ./out/

# Находим все .java файлы в папке SRC_PATH и её подпапках
SOURCES = $(shell find $(SRC_PATH) -type f -name "*.java")

# Для каждого .java файла определяем соответствующий .class файл в BIN_PATH
CLASSES = $(SOURCES:$(SRC_PATH)%.java=$(BIN_PATH)%.class)

all: $(CLASSES)

# Создаем директории через @D (целевой путь минус название файла) и кладем в них целевые файлы
$(BIN_PATH)%.class: $(SRC_PATH)%.java
	@mkdir -p $(@D)
	javac -d $(BIN_PATH) -cp $(SRC_PATH) $<

clean:
	rm -rf $(BIN_PATH)

.PHONY: all clean
