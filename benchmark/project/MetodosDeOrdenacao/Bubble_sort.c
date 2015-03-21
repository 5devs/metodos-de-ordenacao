#include <stdio.h>
#include <conio.h>
#include <stdlib.h>


int * bubble_sort(int vetor[], int tamanho);

int * bubble_sort(int vetor[], int tamanho)
{
 for(int i=tamanho-1; i >= 1; i--) {

    for( int j=0; j < i ; j++) {

      if(vetor[j]>vetor[j+1]) {

        aux = vetor[j];
        vetor[j] = vetor[j+1];
        vetor[j+1] = aux;

        }
      }
    }
}
