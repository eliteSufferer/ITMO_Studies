; Задание №1. Разработать программу обработки для элементов массива M, в которой:
; 1. Массив имеет следующие характеристики:
; - адрес начала массива в памяти БЭВМ - 0x687;
; - число измерений исходного массива - 2;
; - количество элементов исходного массива - 3x3;
; - каждый элемент является знаковым числом с разрядностью 16 бит;
; - нумерация элементов начинается с 1;
; - элементы хранятся в массиве по границам слов, нет необходимости в плотной упаковке;
; 2. Для каждого элемента массива необходимо вычислить функцию:
; - формула функции F(Mi,j) = 3 * Mi,j + 23479;
; - функцию вычислять только для элементов массива с кратными 3-м i-индексами, четными j-индексами;
; - если результат вычисления функции выходит за пределы области допустимых значений элемента массива из п.1, то он принимается равным 18457
; 3. Из всех полученных значений функции необходимо вычислить исключающее 'ИЛИ' значений, и записать в 32-разрядный результат.
; Примечание: все числа представлены в десятичной системе счисления, если явно не указано иное.
;A XOR B = (A AND (NOT B)) OR ((NOT A) AND B)
ORG 0x687
WORD 1
WORD 5
WORD 6
WORD 18
WORD 9
WORD 4
WORD 31
WORD 1
WORD 11

ORG 0x0
I: WORD 1
J: WORD 1
N: WORD 9
MinConst: WORD 0x8000
MaxConst: WORD 0x7FFF
CurrEl: WORD 0x687
XORRes: WORD 0x0000
TMP: WORD ?
TMP_RES: WORD ?
TMP1: WORD ?
ADD_CONST: WORD 0x5BB7
ElseCount: WORD 0x4819
START:

JOB:
LD N
CMP #0
BEQ STOP

LD I
PUSH
CALL CheckI
POP
CMP #0
BEQ JobJ
JUMP GoToNextArr

CheckI:
LD &1
CMP #3
BEQ EqualI
BPL PosI
BMI NegI

PosI:
SUB #3
ST &1
JUMP CheckI

NegI:
CLA
DEC
ST &1
RET

EqualI:
CLA 
ST &1
RET

JobJ:
LD J
PUSH
CALL CheckJ
POP
CMP #0
BEQ RunFunc
JUMP GoToNextArr

CheckJ:
LD &1
CMP #2
BEQ EqualJ
BPL PosJ
BMI NegJ


PosJ:
SUB #2
ST &1
JUMP CheckJ

NegJ:
CLA
DEC
ST &1
RET

EqualJ:
CLA 
ST &1
RET

RunFunc:
LD (CurrEl)
PUSH
CALL Func
POP
ST TMP
LD XORRes
NOT
AND TMP
ST TMP_RES
LD TMP
NOT
AND XORRes
OR TMP_RES
ST XORRes
JUMP GoToNextArr

Func:
LD &1
ST TMP1
ASL
ADD TMP1
ADD ADD_CONST
CMP MaxConst
BGE SkipFunc
CMP MinConst
BLT SkipFunc
ST &1
RET

SkipFunc: LD ElseCount
ST &1
RET

GoToNextArr:
LD J
INC
CMP #4
BNE ContinueJ
JUMP IncI

ContinueJ: 
ST J
JUMP PostJob

IncI:
LD #1
ST J
LD I
INC
ST I
JUMP PostJob

PostJob:
LD N
DEC
ST N
LD CurrEl
INC
ST CurrEl
JUMP JOB

STOP: LD XORRes
HLT
