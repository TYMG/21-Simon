import { Injectable } from '@angular/core';
import { GameStatus, Color, Difficulty } from './game-module';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';



/**
 * 
 * PatternService
 * 
 * Create Patterns
 * Display Patterns
 * Validate Patterns
 * 
 */
@Injectable()
export class PatternService {


    // Observable validatePattern source
    validatePatternSource = new Subject;
    // Observable navItem stream
    validateItem$ = this.validatePatternSource.asObservable();
    private pattern: Array<Color>;
    private turn: number;


    createPattern(): Promise<Color[]> {
        let pattern: Array<Color> = [this.colorGenerator()];
        this.setPattern(pattern);
        this.turn = 1;
        return Promise.resolve(pattern);
    }

    updatePattern(pattern): Promise<Color[]> {
        if (this.pattern === undefined) {
            let newPattern: Array<Color> = [this.colorGenerator()];
            this.turn = 1;
            this.pattern = newPattern;
        } else {
            let newColor: Color = this.colorGenerator();
            pattern.push(newColor);
            this.turn = 1;
            this.pattern = pattern;
        }
        return Promise.resolve(this.pattern);
    }

    /**
     * The validatePattern will take a Color and a turn (where turn = index+1)
     * 
     * validatePattern will take check is Color == Color[turn]
     * 
     * 
     */
    validatePattern(color: Color) {
        let turn = this.turn;
        if (color == undefined || turn == undefined) {
            //Should throw an exception, lazy
            this.validatePatternSource.error("No Pattern or Turn");
        }
        if (this.pattern !== undefined) {
            let patternIndex = turn - 1;
            let patternTurnColor = this.pattern[patternIndex];
            //if the Pattern Color matches input color
            if (patternTurnColor === color.valueOf()) {
                //If the Turn Number is at the length of turn
                if (turn === this.pattern.length) {
                    //once the pattern has been matched fully, turn should be zero
                    this.turn = undefined;
                    this.validatePatternSource.next(0);
                    return;
                } else {
                    this.turn = turn+1;
                    this.validatePatternSource.next(1);
                    return;
                }

            } else {
                //If the pattern color doesnt match the input color
                this.validatePatternSource.next(2);
                this.validatePatternSource.error("INPUT DIDN'T MATCH PATTERN");
            }
        }
        //No pattern means a game hasnt been started
    }

    deletePattern(): Promise<boolean> {
        this.pattern = undefined;
        return Promise.resolve(true);
    }

    generateTestPattern(size): Array<Color> {
        if (size === 0) {
            //go fuck yourself
            return undefined;
        }
        let pattern = new Array<Color>(size);
        for (var index = 0; index < size; index++) {
            pattern[index] = this.colorGenerator();
        }
        return pattern;
    }

    private colorGenerator(): Color {
        let colorIndex: number = Math.floor(Math.random() * 100);
        switch (colorIndex % 4) {
            case 0:
                return Color.GREEN;
            case 1:
                return Color.RED;
            case 2:
                return Color.YELLOW;
            case 3:
                return Color.BLUE;
        }
        return undefined;
    }

    private getPattern(): Array<Color> {
        return this.pattern;
    }

    private setPattern(pattern: Array<Color>): void {
        this.pattern = pattern;
    }

    getTurn(): number {
        return this.turn;
    }

    private setTurn(turn: number): void {
        this.turn = turn;
    }

    resetTurn(): void {
        this.turn = 1;
    }
}
