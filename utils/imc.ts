export function calcularImc(pesoKg: number, estaturaM: number): number {
  if (estaturaM <= 0 || pesoKg <= 0) {
    return 0;
  }
  return Number((pesoKg / (estaturaM * estaturaM)).toFixed(1));
}

export function clasificarImc(imc: number): string {
  if (imc < 18.5) {
    return 'Bajo peso';
  }
  if (imc < 25) {
    return 'Normal';
  }
  if (imc < 30) {
    return 'Sobrepeso';
  }
  if (imc < 35) {
    return 'Obesidad grado I';
  }
  if (imc < 40) {
    return 'Obesidad grado II';
  }
  return 'Obesidad grado III';
}
