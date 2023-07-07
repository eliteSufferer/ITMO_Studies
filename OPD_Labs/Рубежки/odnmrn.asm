;Дан одномерный массив 14-разрядных чисел, индексация начинается с 9. Необходимо найти сумму элементов с четными индексами и записать в 32-разрядный результат.
ORG 0x0
WORD 5 ;14 бит
WORD 0
WORD -133
WORD 18

N: WORD 4
CurrEl: WORD 0x0
CurrEl_St: WORD 0x0
I: WORD 9 ;должен быть четным
Mask: WORD 0x0001
Res1: WORD ?
Res2: WORD ?
ClearMask: WORD 0x3FFF
AddConst: WORD 0xFFFF
ExtSiYo: WORD 0xC000
ReentConst: WORD 0x0

START:
CLA
ST Res1
ST Res2
LD ReentConst
ST CurrEl
LD #9
ST I
LD #4
ST N

JOB:
LD N ;проверка количества элементов, если 0 - то все
CMP #0
BEQ STOP

LD #0 ;обнуляем старушую часть числа
ST CurrEl_St

LD I ;проверка I на четность
AND Mask
BNE PostJob

LD (CurrEl) 
AND ClearMask
ST (CurrEl) ;очистка первых бит числа от мусора
ASL
ASL
ROL ;сдвигаем число на 2 разряда и потом получаем в флаге С знак нашего числа
BCS Sign1 ;если он 1, то идем в расширение знака

Count: 
LD (CurrEl) 
ADD Res1
ST Res1 ;считаем младшую часть результата
LD CurrEl_St
ADC Res2
ST Res2 ;считаем старшую часть результата с учетом С флага из младшей
JUMP PostJob

Sign1: LD (CurrEl) 
ADD ExtSiYo
ST (CurrEl) ;расширяем знак в пределах младшей части числа
LD CurrEl_St
ADD AddConst 
ST CurrEl_St ;расширяем знак у старшей части числа
JUMP Count


PostJob:
LD I
INC
ST I
LD N
DEC
ST N
LD CurrEl
INC
ST CurrEl ;ну и тут увеличиваем индекс, уменьшаем остаток чисел и увеличиваем ссылку на текущий элемент
JUMP JOB

STOP:
HLT
