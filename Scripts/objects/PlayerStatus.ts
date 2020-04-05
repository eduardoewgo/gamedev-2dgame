module objects {
    //
    const COMMON_POWER_UP_DURATION: number = 15 * config.Game.FPS;
    const TRAP_POWER_UP_DURATION: number = 5 * config.Game.FPS;

    class PowerUpInfo {
        // PRIVATE INSTANCE MEMBERS
        private _value: number;
        private _increment: number;
        private _tick: number;
        private _status: enums.PowerUpStatus;
        private _powerMultiplier: number;
        private _powerDuration: number;

        // PUBLIC PROPERTIES
        public get Value(): number {
            return this._value;
        }

        public set Value(value: number) {
            this._value = value;
        }

        public get Increment(): number {
            return this._increment;
        }

        public get Tick(): number {
            return this._tick;
        }

        public set Tick(value: number) {
            this._tick = value;
        }

        public get Status(): enums.PowerUpStatus {
            return this._status;
        }

        public set Status(value: enums.PowerUpStatus) {
            this._status = value;
        }

        public get PowerMultiplier(): number {
            return this._powerMultiplier;
        }

        public get PowerDuration(): number {
            return this._powerDuration;
        }

        constructor(value: number, increment: number, powerMultiplier: number, powerDuration: number) {
            this._value = value;
            this._increment = increment;
            this._tick = -1;
            this._status = enums.PowerUpStatus.INACTIVE;
            this._powerMultiplier = powerMultiplier;
            this._powerDuration = powerDuration;
        }
    }

    export class PlayerStatus {
        // PRIVATE INSTACE MEMBERS
        private _level: number;
        private _status: Array<PowerUpInfo>;
        private _playerId: enums.PlayerId;

        // PUBLIC PROPERTIES
        public get Level(): number {
            return this._level;
        }

        public get PlayerId(): enums.PlayerId {
            return this._playerId;
        }

        // CONSTRUCTORS
        private constructor(
            playerId: enums.PlayerId,
            initialAttackSpeed: number,
            incAS: number,
            initialAttackPower: number,
            incAP: number,
            initialArmor: number,
            incAr: number
        ) {
            this._level = 1;
            this._playerId = playerId;
            this._status = new Array<PowerUpInfo>(enums.StatusTypes.NUM_OF_STATUS);
            this._status[enums.StatusTypes.ATK_SPEED] = new PowerUpInfo(
                initialAttackSpeed,
                -incAS,
                0.5,
                COMMON_POWER_UP_DURATION
            );
            this._status[enums.StatusTypes.ATK_POWER] = new PowerUpInfo(
                initialAttackPower,
                incAP,
                2,
                COMMON_POWER_UP_DURATION
            );
            this._status[enums.StatusTypes.ARMOR] = new PowerUpInfo(initialArmor, incAr, 2, COMMON_POWER_UP_DURATION);
            this._status[enums.StatusTypes.TRAP] = new PowerUpInfo(0, 0, 0, TRAP_POWER_UP_DURATION);
        }

        // PRIVATE METHODS

        // PUBLIC METHODS
        public Update(): void {
            let currentTick = createjs.Ticker.getTicks();

            this._status.forEach((s, type) => {
                if (s.Status != enums.PowerUpStatus.INACTIVE) {
                    let diff = currentTick - s.Tick;
                    switch (s.Status) {
                        case enums.PowerUpStatus.ACTIVE:
                            if (diff >= s.PowerDuration * 0.5) {
                                s.Status = enums.PowerUpStatus.ACTIVE_HALF_TIME;
                                config.Game.GAME_BAR.ChangePlayerStatus(this._playerId, type, s.Status);
                            }
                            break;

                        case enums.PowerUpStatus.ACTIVE_HALF_TIME:
                            if (diff >= s.PowerDuration * 0.75) {
                                s.Status = enums.PowerUpStatus.ACTIVE_QUARTER_TIME;
                                config.Game.GAME_BAR.ChangePlayerStatus(this._playerId, type, s.Status);
                            }
                            break;

                        case enums.PowerUpStatus.ACTIVE_QUARTER_TIME:
                            if (diff > s.PowerDuration) {
                                s.Status = enums.PowerUpStatus.INACTIVE;
                                s.Tick = constants.DEFAULT_POWER_UP_TICK;
                                config.Game.GAME_BAR.ChangePlayerStatus(this._playerId, type, s.Status);
                            }
                            break;
                    }
                }
            });
        }

        public LevelUp(): void {
            if (this._level < constants.MAX_LEVEL) {
                this._level++;
                this._status.forEach(s => (s.Value += s.Increment));
            }
        }

        public CalculateDamage(attack: number) {
            return attack - attack * this.GetValue(enums.StatusTypes.ARMOR) * 0.01;
        }

        public ActivatePowerUp(power: objects.PowerUp, tick: number): void {
            let type: enums.StatusTypes;

            switch (power.PowerType) {
                case enums.PowerUpTypes.ARMOR:
                    type = enums.StatusTypes.ARMOR;
                    break;

                case enums.PowerUpTypes.ATTACK_POWER:
                    type = enums.StatusTypes.ATK_POWER;
                    break;

                case enums.PowerUpTypes.ATTACK_SPEED:
                    type = enums.StatusTypes.ATK_SPEED;
                    break;

                case enums.PowerUpTypes.TRAP:
                    type = enums.StatusTypes.TRAP;
                    break;
            }

            let powerInfo: PowerUpInfo = this._status[type];
            if (powerInfo) {
                powerInfo.Tick = tick;
                powerInfo.Status = enums.PowerUpStatus.ACTIVE;
                config.Game.GAME_BAR.ChangePlayerStatus(this._playerId, type, powerInfo.Status);
            }
        }

        public GetValue(type: enums.StatusTypes): number {
            let power = this._status[type];
            // Verify if the power up is active
            if (power.Status != enums.PowerUpStatus.INACTIVE) {
                return power.Value * power.PowerMultiplier;
            }
            return power.Value;
        }

        public GetPowerStatus(type: enums.StatusTypes): enums.PowerUpStatus {
            return this._status[type].Status;
        }

        public static GetPlayerStatus(plrId: enums.PlayerId, plrClass: string): objects.PlayerStatus {
            let iniAS, incAS, iniAP, incAP, iniAr, incAr;

            if (plrClass == constants.PlayerType.MAGE_IDLE) {
                iniAS = 120;
                incAS = 10;
                iniAP = 20;
                incAP = 3;
                iniAr = 6;
                incAr = 1;
            } else if (plrClass == constants.PlayerType.ROGUE_IDLE) {
                iniAS = 80;
                incAS = 8;
                iniAP = 12;
                incAP = 2;
                iniAr = 10;
                incAr = 1;
            } else if (plrClass == constants.PlayerType.DEMON_IDLE) {
                iniAS = 90;
                incAS = 5;
                iniAP = 15;
                incAP = 2;
                iniAr = 12;
                incAr = 2;
            }
            return new objects.PlayerStatus(plrId, iniAS, incAS, iniAP, incAP, iniAr, incAr);
        }
    }
}
