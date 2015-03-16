#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#define TAMANHO 50000
#define SEG 5

double benchmark_selection_sort(int vetor[], int tam);

int main()
{
    int vetor[TAMANHO], i;
    for(i=0; i<TAMANHO; i++)
        vetor[i] = rand();

    printf("/*** BENCHMARK METODOS DE ORDENACAO ***\\\n");
    printf("Testando com vetor com %d itens.\n\n", TAMANHO);

    printf("SELECTION SORT\n");
    benchmark_selection_sort(vetor, TAMANHO);

    //for(i=0; i<TAMANHO; i++)
        //printf("%d, ", i, vetor[i]);

    getch();
    return 0;
}

double benchmark_selection_sort(int vetor[], int tam) {
    int i;
    double duracao, duracaoTotal = 0, media;
    clock_t inicio, fim;

    for(i = 0; i < SEG; i++) {
        inicio = clock();
        selection_sort(vetor, TAMANHO);
        fim = clock();

        duracao = ((double) (fim - inicio)) / CLOCKS_PER_SEC;
        duracaoTotal += duracao;

        printf("Iteracao #%d: %f\n", i+1, duracao);
    }

    media = duracaoTotal / SEG;
    printf("Media: %f\n\n", media);

    return media;
}
