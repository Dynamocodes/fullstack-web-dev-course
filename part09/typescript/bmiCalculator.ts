const calculateBmi = (height: number, mass: number): string => {
    const bmi = mass/((height/100)**2)
    switch(true){
        case bmi < 16:
            return 'Underwaigth (Severe thinness)'
        case bmi <= 16.9:
            return 'Underweight (Moderate thinness)'
        case bmi <= 18.4:
            return 'Underweight (Mild thinness)'
        case bmi <= 24.9:
            return 'Normal range'
        case bmi <= 34.9:
            return 'Overweight (Pre-obese)'
        case bmi <= 34.9:
            return 'Obese (Class I)'
        case bmi <= 39.9:
            return 'Obese (Class II)'
        case bmi >= 40:
            return 'Obese (Class III)'
        default:
            return 'something wrong happened'
    }
}

console.log(calculateBmi(185, 66,))
