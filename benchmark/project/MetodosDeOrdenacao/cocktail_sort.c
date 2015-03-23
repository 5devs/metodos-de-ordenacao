#include <stdio.h>
#include <conio.h>
#include <stdlib.h>

int* cocktail_sort(int vetor[], int tamanho);

int* cocktail_sort(int vetor[], int tamanho) {
    int length, bottom, top, swapped, i, aux;
    length = tamanho;
    bottom = 0;
    top = length-1;
    swapped = 0;
    while(swapped == 0 && bottom < top) {
        swapped = 1;
        for(i = bottom; i < top; i = i+1) {
            if(vetor[i] > vetor[i+1]) {
                aux = vetor[i];
                vetor[i] = vetor[i+1];
                vetor[i+1] = aux;
                swapped = 0;
            }
        }
        top = top-1;
        for(i = top; i > bottom; i = i-1) {
            if(vetor[i] < vetor[i-1]) {
                aux = vetor[i];
                vetor[i] = vetor[i-1];
                vetor[i-1] = aux;
                swapped = 0;
            }
        }
        bottom = bottom+1;
    }
    return vetor;
}
