#include <stdio.h>
#include <conio.h>
#include <stdlib.h>

int* quick_sort(int vetor[],int esq, int dir);

int* quick_sort(int vetor[],int esq, int dir) {
    int i, j, pivo, aux;
	i = esq;
	j = dir;
	pivo = vetor[(i+j)/2];
	do {
       while(vetor[i] < pivo && i < dir)
         i++;
	   while(vetor[j] > pivo && j > esq)
	     j--;
	   if(i <= j) {
         aux = vetor[i];
         vetor[i] = vetor[j];
         vetor[j] = aux;
         i++;
         j--;
	   }
	}while (i <= j);
	if(esq < j) quick_sort(vetor, esq, j);
	if(dir > i) quick_sort(vetor, i, dir);
    return vetor;
}


