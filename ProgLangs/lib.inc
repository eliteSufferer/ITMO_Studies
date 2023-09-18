section .text

 
; Принимает код возврата и завершает текущий процесс
exit: 
    mov rax, 60
    syscall
    xor rax, rax
    ret 

string_length:
    xor rax, rax

.loop:
    cmp byte[rdi+rax], 0
    je .end
    
    inc rax
    
    jmp .loop

.end:
    ret
    
; Принимает указатель на нуль-терминированную строку, выводит её в stdout
print_string:
    push rdi

    xor rax, rax
    call string_length
    mov rdi, 1   
    pop rsi      
    mov rdx, rax  
    mov rax, 1
    syscall

    ret
    
    
; Принимает код символа и выводит его в stdout
print_char:
    sub rsp, 1
    mov [rsp], dil
    mov rax, 1
    mov rdi, 1
    mov rsi, rsp
    mov rdx, 1
    syscall
        
    add rsp, 1    
    ret
    

; Переводит строку (выводит символ с кодом 0xA)
print_newline:
    mov rdi, 0xA
    jmp print_char


; Выводит беззнаковое 8-байтовое число в десятичном формате 
; Совет: выделите место в стеке и храните там результаты деления
; Не забудьте перевести цифры в их ASCII коды.

print_uint:

    push rbx
    push rsi
    sub rsp, 32          
    mov rsi, rsp         

    mov rbx, 10          
    mov rax, rdi         
    
    test rax, rax        
    jz .handle_zero

.loop:
    xor rdx, rdx         
    div rbx              
    add dl, '0'          
    dec rsi              
    mov [rsi], dl        

    test rax, rax        
    jnz .loop
    jmp .write_output

.handle_zero:
    dec rsi              
    mov byte [rsi], '0'  

.write_output:
    mov rax, 1           
    mov rdi, 1           
    mov rdx, rsp         
    sub rdx, rsi
    syscall              

    add rsp, 32     
    pop rsi
    pop rbx     
    ret



; Выводит знаковое 8-байтовое число в десятичном формате 

print_int:
    push rbx            
    push rsi            
    push rcx            

    sub rsp, 32         
    mov rsi, rsp        

    xor rcx, rcx        
    test rdi, rdi       
    jns .positive       
    neg rdi             
    inc rcx             

.positive:
    mov rbx, 10         
    mov rax, rdi        
    
    test rax, rax       
    jz .handle_zero

.loop:
    xor rdx, rdx        
    div rbx             
    add dl, '0'         
    dec rsi             
    mov [rsi], dl       

    test rax, rax       
    jnz .loop

    test rcx, rcx       
    jz .write_output
    dec rsi             
    mov byte [rsi], '-' 

    jmp .write_output

.handle_zero:
    dec rsi             
    mov byte [rsi], '0' 

.write_output:
    mov rax, 1          
    mov rdi, 1          
    mov rdx, rsp        
    sub rdx, rsi
    syscall             

    add rsp, 32         

    pop rcx             
    pop rsi             
    pop rbx             

    ret


; Принимает два указателя на нуль-терминированные строки, возвращает 1 если они равны, 0 иначе
string_equals:
	
xor rax, rax 

.loop:
    
    mov al, byte [rdi]
    cmp al, byte [rsi]
    
    
    jne .end

    
    test al, al
    jz .strings_are_equal
    
    
    inc rdi
    inc rsi

    
    jmp .loop

.strings_are_equal:
    mov rax, 1

.end:
    ret




; Читает один символ из stdin и возвращает его. Возвращает 0 если достигнут конец потока
read_char:
    
    sub rsp, 1

    
    mov rax, 0      
    mov rdi, 0      
    mov rsi, rsp    
    mov rdx, 1      

    
    syscall

   
    test rax, rax   
    jz .eof
    mov al, [rsp]
    add rsp, 1
    ret
.eof:
    
    add rsp, 1

    xor rax, rax 
    ret

; Принимает: адрес начала буфера, размер буфера
; Читает в буфер слово из stdin, пропуская пробельные символы в начале, .
; Пробельные символы это пробел 0x20, табуляция 0x9 и перевод строки 0xA.
; Останавливается и возвращает 0 если слово слишком большое для буфера
; При успехе возвращает адрес буфера в rax, длину слова в rdx.
; При неудаче возвращает 0 в rax
; Эта функция должна дописывать к слову нуль-терминатор

read_word:
    xor r8, r8  

.loop_check:
    cmp r8, rsi  
    jae .exit_fail

    push rdi
    push rsi
    push r8
    call read_char  
    pop r8
    pop rsi
    pop rdi

    test al, al  
    jz .exit_success

    
    cmp al, 0x20
    je .skip_whitespace
    cmp al, 0x9
    je .skip_whitespace
    cmp al, 0xA
    je .skip_whitespace
    
    mov [rdi + r8], al  
    inc r8  

    jmp .loop_check  

.exit_success:
    mov byte [rdi + r8], 0  
    mov rax, rdi  
    mov rdx, r8  
    ret

.exit_fail:
    xor rax, rax  
    ret

.skip_whitespace:
    test r8, r8 
    jnz .exit_success
    jmp .loop_check

; Принимает указатель на строку, пытается
; прочитать из её начала беззнаковое число.
; Возвращает в rax: число, rdx : его длину в символах
; rdx = 0 если число прочитать не удалось
parse_uint:
    xor rax, rax
    xor rdx, rdx
    
    .loop:
    	movzx r8, byte [rdi + rdx]
    	test r8, r8
    	jz .end
    	sub r8, 0x30
    	cmp r8, 9
    	ja .end
    	
    	imul rax, rax, 10
    	add rax, r8
    	inc rdx
    	
    	jmp .loop
    	
    .end:
    	test rdx, rdx
    	jz .fail
    	ret
    .fail:
    	xor rax, rax
    	xor rdx, rdx
    	ret
	
; Принимает указатель на строку, пытается
; прочитать из её начала знаковое число.
; Если есть знак, пробелы между ним и числом не разрешены.
; Возвращает в rax: число, rdx : его длину в символах (включая знак, если он был) 
; rdx = 0 если число прочитать не удалось
parse_int:
    mov al, [rdi]
    cmp al, '-'      
    jne .positive              
    
    inc rdi                    
    call parse_uint            
    
    cmp rdx, 0                 
    je .fail                   
    
    inc rdx                    
    neg rax                    
    
    ret

.positive:
    call parse_uint           
    ret                       

.fail:
    xor rax, rax               
    xor rdx, rdx               
    ret
  
    	
    
; Принимает указатель на строку, указатель на буфер и длину буфера
; Копирует строку в буфер
; Возвращает длину строки если она умещается в буфер, иначе 0
string_copy:
xor rcx, rcx 

    .main_loop:
       
        cmp rcx, rdx
        jae .failure 
        
       
        mov al, [rdi + rcx]
        mov [rsi + rcx], al
        
        
        test al, al
        jz .success_exit
        
       
        inc rcx

        
        jmp .main_loop

    .success_exit:

        mov rax, rcx
        ret

    .failure:
        
        xor rax, rax
        ret
