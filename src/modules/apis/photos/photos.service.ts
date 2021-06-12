import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhoToDTO } from './dto/create-photo.dto';
import { PhotosQueryParams } from './dto/photos.query';
import { UpdatePhotoDTO } from './dto/upload-photo.dto';
import { Photo } from './entities/photo.entity';
import * as _ from 'lodash'
import { S3Service } from 'src/s3/s3.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PhotosService {

  @Inject()
  s3Service: S3Service;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>

  @InjectRepository(Photo)
  private readonly photoRepository: Repository<Photo>;

  private async checkUserAccessRight(user: User, photoId: string): Promise<boolean> {
    const photo = await this.photoRepository.findOne({
      where: {
        id: photoId
      }
    })
    if (photo) {
      return photo.userId == user.id ? true : false
    }
    throw new HttpException("Photo not found", HttpStatus.NOT_FOUND)
  }

  async create(createPhotoDTO: CreatePhoToDTO): Promise<Photo> {
    return this.photoRepository.save(createPhotoDTO);
  }

  async findAll(queryParams: PhotosQueryParams): Promise<any> {
    const page = queryParams['page'] || 0
    const limit = queryParams['limit'] || 5
    const skip = page * limit

    const where = _.omit(queryParams, ['page', 'limit'])

    const [photos, count] = await this.photoRepository.findAndCount({
      where: where,
      skip,
      take: limit,
      order: {createdAt: "DESC"},
      select: ['id', 'photoLocation', 'photoName']
    })

    const photosPublic = photos.map(photo => {
      const accessURL = this.s3Service.getCDNURL(photo.photoLocation)
      return {
        ...photo,
        accessURL
      } 
    })

    return {
      metaData: {
        page,
        limit,
        totalPage: Math.ceil(count / limit)
      },
      photos: photosPublic
    }
  }

  async findOne(id: string): Promise<Photo> {
    return this.photoRepository.findOne(id);
  }

  update(id: number, updateUploadImageDto: UpdatePhotoDTO) {
    return `This action updates a #${id} uploadImage`;
  }

  async remove(user: User, id: string) {
    const isHasRight = await this.checkUserAccessRight(user, id)
    if (isHasRight) {
      const rs = await this.photoRepository.softDelete(id)
      if(rs.affected > 0) {
        return {
          id
        }
      }
    }
    else {
      throw new HttpException({
        status: 401,
        msg: "Not have permission"
      }, HttpStatus.UNAUTHORIZED)
    }
  }


  async findByAlbumId(albumId: string) {
   const [photos, count] = await this.photoRepository.findAndCount({
      where: {albumId},
      order: {createdAt: 'DESC'},
      take: 5
   })
   return {count, photos}
  }
}
