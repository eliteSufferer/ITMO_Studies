%macro declare_string 1-* 
    %rep %0            
        db %1          
        db ", "        
    %rotate 1          
    %endrep           
    db 0             
%endmacro             

section .data
    str: declare_string "hello", "another", "world"