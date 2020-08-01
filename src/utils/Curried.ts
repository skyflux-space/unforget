import {Placeholder} from 'ramda'


export type Curried<A, B = A, C = B> = {
    (a: A, b: B): C
    (a: A): (b: B) => C
    <T = A>(a: Placeholder, b: B): (a: T) => C
}