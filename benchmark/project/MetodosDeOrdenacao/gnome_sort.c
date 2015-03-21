
void swap(int * ,int *);
int* gnome_sort(int vetor[], int tamanho);

int* gnome_sort(int vetor[], int tamanho)
{
 int next = 0, previous = 0;
 int i = 0;

 for(i = 0; i < size ; i++)
 {
    if(VectorSort[i] > VectorSort[i + 1])
     {
      previous = i;
      next = i + 1;
      while(VectorSort[previous] > VectorSort[next])
      {
        swap(&VectorSort[previous],&VectorSort[next]);
        if(previous > 0)
        previous--;
        if(next > 0)
        next--;
      }
     }
 }


}

void swap(int *A, int *B)
{
 int C = *A;
* A = *B;
* B = C;
}
