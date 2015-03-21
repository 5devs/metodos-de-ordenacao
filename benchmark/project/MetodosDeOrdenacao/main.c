#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#define TAMANHO 50000
#define SEG 5

double benchmark_selection_sort(int vetor_o[], int tam);
double benchmark_bubble_sort(int vetor_o[], int tam );
double benchmark_quick_sort(int vetor_o[], int tam );
double benchmark_gnome_sort(int vetor_o[], int tam );
void copiar_vetor (int vetor_o[],int vetor_c[],int tam);
void imprime (int vetor_c[], int tam);

int main()
{
    int vetor_original[TAMANHO], i;

    for(i=0; i<TAMANHO; i++)
        vetor_original[i] = rand() % 100000;



    printf("/*** BENCHMARK METODOS DE ORDENACAO ***\\\n");
    printf("Testando com vetor com %d itens.\n\n", TAMANHO);


    printf("SELECTION SORT\n");
    benchmark_selection_sort(vetor_original, TAMANHO);


    printf("BUBBLE SORT\n");
    benchmark_bubble_sort(vetor_original, TAMANHO);

    printf("QUICK SORT\n");
    benchmark_quick_sort(vetor_original, TAMANHO);

    //for(i=0; i<TAMANHO; i++)
        //printf("%d, ", vetor[i]);

    getch();
    return 0;
}

double benchmark_selection_sort(int vetor_o[],  int tam){
    int i,vetor_c[tam];
    double duracao, duracaoTotal = 0, media;
    clock_t inicio, fim;


    for(i = 0; i < SEG; i++) {
        copiar_vetor(vetor_o,vetor_c, tam);
        inicio = clock();
        selection_sort(vetor_c, tam);
        fim = clock();



        duracao = ((double) (fim - inicio)) / CLOCKS_PER_SEC;
        duracaoTotal += duracao;

        printf("Iteracao #%d: %f\n", i+1, duracao);
    }


    media = duracaoTotal / SEG;
    printf("Media: %f\n\n", media);

    return media;
}

double benchmark_bubble_sort(int vetor_o[], int tam){
    int i,vetor_c[tam];
    double duracao, duracaoTotal = 0, media;
    clock_t inicio, fim;


    for(i = 0; i < SEG; i++) {
        copiar_vetor(vetor_o,vetor_c, tam);
        inicio = clock();
        bubble_sort(vetor_c, tam);
        fim = clock();

        duracao = ((double) (fim - inicio)) / CLOCKS_PER_SEC;
        duracaoTotal += duracao;

        printf("Iteracao #%d: %f\n", i+1, duracao);
    }


    media = duracaoTotal / SEG;
    printf("Media: %f\n\n", media);

    return media;
}

double benchmark_quick_sort(int vetor_o[], int tam){
    int i,vetor_c[tam];
    double duracao, duracaoTotal = 0, media;
    clock_t inicio, fim;


    for(i = 0; i < SEG; i++) {
        copiar_vetor(vetor_o,vetor_c, tam);
        inicio = clock();
        quick_sort(vetor_c,0, tam-1);
        fim = clock();

        duracao = ((double) (fim - inicio)) / CLOCKS_PER_SEC;
        duracaoTotal += duracao;

        printf("Iteracao #%d: %f\n", i+1, duracao);
    }

    media = duracaoTotal / SEG;
    printf("Media: %f\n\n", media);

    return media;
}

double benchmark_quick_sort(int vetor_o[], int tam){
    int i,vetor_c[tam];
    double duracao, duracaoTotal = 0, media;
    clock_t inicio, fim;


    for(i = 0; i < SEG; i++) {
        copiar_vetor(vetor_o,vetor_c, tam);
        inicio = clock();
        gnome_sort(vetor_c,0, tam);
        fim = clock();

        duracao = ((double) (fim - inicio)) / CLOCKS_PER_SEC;
        duracaoTotal += duracao;

        printf("Iteracao #%d: %f\n", i+1, duracao);
    }

    media = duracaoTotal / SEG;
    printf("Media: %f\n\n", media);

    return media;
}



void copiar_vetor(int vetor_o[], int vetor_c[], int tam)
{
     int i;

    for(i=0 ; i < tam; i++)

        vetor_c[i] = vetor_o[i];
}
void imprime (int vetor_c[], int tam);


void imprime (int vetor_c[], int tam){
int i;
printf("\n");
for (i=0;i<tam;i++){
    printf(" %d ", vetor_c[i]);
}    printf("\n");



}
