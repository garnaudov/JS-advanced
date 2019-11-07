function jumpingJimmy(tower, jumpHeight) {
    let sum = 0;
    let index=0;
    while(tower[index] <= jumpHeight){
        sum += tower[index];
        index++;
    }
    return sum;
}
