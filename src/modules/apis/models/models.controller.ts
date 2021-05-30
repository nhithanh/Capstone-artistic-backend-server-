import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Inject } from '@nestjs/common';
import { ModelsService } from './models.service';
import { CreateModelDTO } from './dto/create-model.dto';
import { UpdateModelDTO } from './dto/update-model.dto';
import { ProducerService } from 'src/modules/producer/producer.service';

@Controller('models')
export class ModelsController {

  @Inject()
  producerService: ProducerService;

  constructor(private readonly modelsService: ModelsService) {}

  @Post()
  create(@Body() createModelDTO: CreateModelDTO) {
    return this.modelsService.create(createModelDTO);
  }

  @Put(':id/active-snapshot')
  async updateActiveSnapshot(@Param('id') id, @Body('snapshotId') snapshotId: string) {
    const {model, snapshot, style} = await this.modelsService.updateActiveSnapshot(id, snapshotId)
    this.producerService.emitUpdateModel(style.routingKey, snapshot.location)
    return {
      model,
      snapshot,
      style
    }
  }

  @Get()
  findAll() {
    return this.modelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAiModelDto: UpdateModelDTO) {
    return this.modelsService.update(+id, updateAiModelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modelsService.remove(+id);
  }
}
