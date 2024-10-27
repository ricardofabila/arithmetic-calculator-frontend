export enum OPERATION_TYPE {
    Addition = 'addition',
    Subtraction = 'subtraction',
    Multiplication = 'multiplication',
    Division = 'division',
    SquareRoot = 'square_root',
    RandomString = 'random_string',
}

export const AVAILABLE_OPERATIONS = Object.values(OPERATION_TYPE);