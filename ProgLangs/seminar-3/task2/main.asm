%include "lib.inc"

section .text
global _start

_start:
    mov rdi, 112233445566
    call print_hex
    call exit