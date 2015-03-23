#include <stdio.h>
#include <conio.h>
#include <stdlib.h>

int* selection_sort(int vetor[], int tamanho);

int* selection_sort(int vetor[], int tamanho) {
    int i, j, min, aux;
    for (i = 0; i < (tamanho-1); i++) {
        min = i;
        for (j = (i+1); j < tamanho; j++) {
            if(vetor[j] < vetor[min])
               min = j;
        }
        if (i != min) {
           aux = vetor[i];
           vetor[i] = vetor[min];
           vetor[min] = aux;
        }
    }
    return vetor;
}

