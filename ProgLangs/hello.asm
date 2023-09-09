; hello.asm
section .data
message: db 'hello, world!', 10
error: db 'ashipka', 10
section .text
global _start
_start:
	mov rax, 1
	mov rdi, 1
	mov rsi, message
	mov rdx, 14 ;+1 from the string length since we have to encode moving to a new string
	syscall
	
	mov rax, 1
	mov rdi, 2
	mov rsi, error
	mov rdx, 8
	syscall
	
	mov rax, 60
	xor rdi, rdi
	syscall
