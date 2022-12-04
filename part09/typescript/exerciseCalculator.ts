interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface ExerciseValues {
    days: Array<number>,
    target: number
}

const parseArgumentsExercise = (args: Array<string>) : ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    let daysString = args.filter((_e, i ) => {return i >= 3})
    let daysNumber = daysString.map(e => {
        if(isNaN(Number(e))) throw new Error('Provided values were invalid!')
        return Number(e)
    })
    if (!isNaN(Number(args[2]))) {
        return {
          days: daysNumber,
          target: Number(args[2])
        }
    }else{
        throw new Error('Provided Values were invalid')
    }
}

const MAX_RATNIG = 5


const calculateExercises = (days: Array<number>, target: number): Result => {
    const average = days.reduce((amount, hours) => {return amount + hours}, 0)/days.length
    let rating
    if(average > target){
        rating = MAX_RATNIG
    }else{
        rating = (average * MAX_RATNIG)/(target*2)
    }

    let ratingDescription
    switch(true){
        case rating < MAX_RATNIG * 0.2:
            ratingDescription = "not enough effort unfortunately"
            break
        case rating < MAX_RATNIG * 0.4:
            ratingDescription = "slight effort, not quite there yet, keep going"
            break
        case rating < MAX_RATNIG * 0.6:
            ratingDescription = "enough to pass"
            break
        case rating < MAX_RATNIG * 0.8:
            ratingDescription = "really good work, a tiny bit more work and you'd get full credit"
            break
        case rating <= MAX_RATNIG :
            ratingDescription = "excellent, job done as expected"
            break
        default:
            ratingDescription = 'confused with the work'
            
    }

    const result = {
        periodLength: days.length,
        trainingDays: days.filter(el => el != 0 ).length,
        success: average >= target,
        rating,
        ratingDescription,
        target,
        average,

    }
    return result
}

try {
    const { days, target } = parseArgumentsExercise(process.argv);
    console.log(calculateExercises(days, target))
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))