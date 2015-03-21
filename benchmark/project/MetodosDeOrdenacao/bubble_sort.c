#include <stdio.h>
#include <conio.h>
#include <stdlib.h>

int* bubble_sort(int vetor[], int tamanho);

int* bubble_sort(int vetor[], int tamanho)
{
    int i, j, aux=0;
	for (i=tamanho-1; i > 0; i--){
		for(j=0; j < i; j++) {
			if(vetor[j] > vetor[j+1]) {
				int temp;
				temp = vetor[j];
				vetor[j] = vetor [j+1];
				vetor[j+1] = temp;
			}
		}

	}

    return vetor;
}
