#include <stdio.h>
#include <conio.h>
#include <stdlib.h>

void swap(int * ,int *);

int* gnome_sort(int vetor[], int tamanho);

int* gnome_sort(int vetor[], int tamanho) {
    int next = 0, previous = 0;
    int i = 0;
    for(i = 0; i < tamanho; i++) {
        if(vetor[i] > vetor[i+1]) {
          previous = i;
          next = i+1;
          while(vetor[previous] > vetor[next]) {
            swap(&vetor[previous], &vetor[next]);
            if(previous > 0)
              previous--;
            if(next > 0)
              next--;
         }
       }
     }
     return vetor;
}
void swap(int *A, int *B) {
    int C = *A;
    * A = *B;
    * B = C;
}

