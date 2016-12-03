import { Injectable } from '@angular/core';
import { GameStatus, Color, Difficulty } from './game-module';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


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
    validatePatternSource = new BehaviorSubject<number>(0);
    // Observable navItem stream
    validateItem$ = this.validatePatternSource.asObservable();
    private pattern: Array<Color>;

    createPattern(): Promise<Color[]> {
        let pattern: Array<Color> = [this.colorGenerator()];
        this.setPattern(pattern);
        return Promise.resolve(pattern);
    }

    updatePattern(): Promise<Color[]> {
        if (this.getPattern != undefined) {
            this.createPattern;
            return;
        }
        let newColor: Color = this.colorGenerator();
        this.getPattern().push(newColor);
        return Promise.resolve(this.getPattern());
    }

    /**
     * The validatePattern will take a Color and a turn (where turn = index+1)
     * 
     * validatePattern will take check is Color == Color[turn]
     * 
     * 
     */
    validatePattern(color:Color, turn: number) {
        if (color == undefined || turn == undefined) {
            //Should throw an exception, lazy
            this.validatePatternSource.error("No Pattern or Turn");
        }
        if (this.pattern !== undefined){
            let patternIndex = turn - 1;
            let patternTurnColor = this.pattern[patternIndex];
            //if the Pattern Color matches input color
            if (patternTurnColor === color.valueOf()) {
                //If the Turn Number is at the length of turn
                if (turn === this.pattern.length ){
                    this.validatePatternSource.complete();
                } else {
                    this.validatePatternSource.next(1);
                }

            }
            //If the pattern color doesnt match the input color
            this.validatePatternSource.next(2);
        }
        //No pattern means a game hasnt been started
        this.validatePatternSource.next(0);
    }

    deletePattern(): Promise<boolean> {
        this.pattern = new Array<Color>(0);
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

}
