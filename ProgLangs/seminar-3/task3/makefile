NASM = nasm
NASMFLAGS = -felf64
LD = ld
OBJ_FILES = lib.o main.o

all: program

%.o: %.asm
	$(NASM) $(NASMFLAGS) $< -o $@

program: $(OBJ_FILES)
	$(LD) -o $@ $^ 

.PHONY: clean all

clean:
	rm -f $(OBJ_FILES) program

rebuild: clean all
