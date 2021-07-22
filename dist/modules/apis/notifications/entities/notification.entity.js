"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
let Notification = class Notification {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Notification.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: null }),
    __metadata("design:type", String)
], Notification.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User),
    typeorm_1.JoinColumn(),
    __metadata("design:type", user_entity_1.User)
], Notification.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: false
    }),
    __metadata("design:type", String)
], Notification.prototype, "message", void 0);
__decorate([
    typeorm_1.Column({
        type: 'boolean',
        default: false
    }),
    __metadata("design:type", Boolean)
], Notification.prototype, "isReaded", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Notification.prototype, "createdAt", void 0);
Notification = __decorate([
    typeorm_1.Entity()
], Notification);
exports.Notification = Notification;
//# sourceMappingURL=notification.entity.js.map