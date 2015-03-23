#include <stdio.h>
#include <conio.h>
#include <stdlib.h>

int* comb_sort(int vetor[], int tamanho);

int* comb_sort(int vetor[], int tamanho) {
    float shrink_factor = 1.247330950103979;
    int gap = tamanho, swapped = 1, swap, i;
    while ((gap > 1) || swapped) {
        if (gap > 1)
           gap = gap/shrink_factor;
        swapped = 0;
        i = 0;
        while ((gap+i) < tamanho) {
            if (vetor[i]-vetor[i+gap] > 0) {
                swap = vetor[i];
                vetor[i] = vetor[i+gap];
                vetor[i+gap] = swap;
                swapped = 1;
            }
            ++i;
        }
    }
    return vetor;
}
