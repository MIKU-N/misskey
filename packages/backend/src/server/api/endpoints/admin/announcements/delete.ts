import { Inject, Injectable } from '@nestjs/common';
import { Endpoint } from '@/server/api/endpoint-base.js';
import type { AnnouncementsRepository } from '@/models/index.js';
import { DI } from '@/di-symbols.js';
import { ApiError } from '../../../error.js';

// eslint-disable-next-line import/no-default-export
@Injectable()
export default class extends Endpoint<'admin/announcements/delete'> {
	name = 'admin/announcements/delete' as const;
	constructor(
		@Inject(DI.announcementsRepository)
		private announcementsRepository: AnnouncementsRepository,
	) {
		super(async (ps, me) => {
			const announcement = await this.announcementsRepository.findOneBy({ id: ps.id });

			if (announcement == null) throw new ApiError(this.meta.errors.noSuchAnnouncement);

			await this.announcementsRepository.delete(announcement.id);
		});
	}
}
