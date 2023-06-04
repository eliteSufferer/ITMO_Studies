;1. Массив имеет следующие характеристики:
; - адрес начала массива в памяти БЭВМ - 0x6c8;
; - число измерений исходного массива - 1;
; - количество элементов исходного массива - 4;
; - каждый элемент является знаковым числом с разрядностью 10 бит;
; - нумерация элементов начинается с 1;
; - элементы хранятся в массиве по границам слов, нет необходимости в плотной упаковке;
; 2. Для каждого элемента массива необходимо вычислить функцию:
; - формула функции F(Mi) = 2 * Mi + 17;
; - функцию вычислять только для элементов массива с кратными 2-м i-индексами;
; - если результат вычисления функции выходит за пределы области допустимых значений элемента массива из п.1, то он принимается равным 300
; 3. Из всех полученных значений функции необходимо вычислить минимальное значение, и записать в 32-разрядный результат.
; Примечание: все числа представлены в десятичной системе счисления, если явно не указано иное.

ORG 0x7c8
WORD 0x2
WORD 0x5
WORD 0x7
WORD 0x4

;f(x) = 2x+17
ORG 0x0
CurrEl: WORD 0x7c8
N: WORD 4
I: WORD 0x1
MaxConst: WORD 247
MinConst: WORD 0xFEF8
ElseCount: WORD 0x12C
MaxEl: WORD 0x8000

START:

JOB: LD N
CMP #0
BEQ STOP

LD I
PUSH
CALL CheckI
POP
CMP #0
BEQ RunFunc
JUMP PostJob

RunFunc: LD (CurrEl)
PUSH
CALL Func
POP
CMP MaxEl
BLT PostJob
ST MaxEl

PostJob:
LD I
INC
ST I
LD N
DEC
ST N
LD CurrEl
INC
ST CurrEl
JUMP JOB

Func: 
LD &1
ASL
ADD #17
CMP MaxConst
BPL SkipFunction
CMP MinConst
BMI SkipFunction
ST &1
RET


SkipFunction: LD ElseCount
ST &1
RET

CheckI: LD &1
CMP #2
BEQ EqualI
BPL PositiveI
BMI NegativeI

PositiveI:
SUB #2
ST &1
JUMP CheckI

NegativeI:
CLA
DEC
ST &1
RET

EqualI:
CLA
ST &1
RET

STOP: LD MaxEl
HLT
