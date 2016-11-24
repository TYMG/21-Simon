import { Injectable } from '@angular/core';
import { GameStatus, Color, Difficulty } from './game-module';

/**
 * 
 * GameService
 * 
 * Create Patterns
 * Display Patterns
 * Validate Patterns
 * 
 */
@Injectable()
export class PatternService {
    private pattern: Array<Color>;

    createPattern(): Promise<Color[]> {
        if (this.pattern != undefined) {
            return undefined;
        }
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
     * The Read Pattern will take a Color and a turn
     * 
     * readPattern will take check is Color == Color[turn]
     */
    readPattern(color: Color, turn: number): Promise<boolean> {
        if (color == undefined || turn == undefined) {
            //Should throw an exception, lazy
            return Promise.resolve(false);
        }
        let patternTurnColor = this.pattern[turn];
        if (patternTurnColor.valueOf === color.valueOf) {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    deletePattern(): Promise<boolean> {
        this.pattern = new Array<Color>(0);
        return Promise.resolve(true);
    }

    generateTestPattern(size):Array<Color>{
        if (size === 0) {
            //go fuck yourself
            return undefined;
        }
        let pattern = new Array<Color>(size);
        for (var index = 0; index < size; index++) {
            pattern[index]=this.colorGenerator();
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
                return Color.BLUE;
            case 3:
                return Color.YELLOW;
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
