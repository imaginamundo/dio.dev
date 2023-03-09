export function generateSlug(file: string) {
  return file.split('/').pop()!.replace(/\.[^/.]+$/, "")
}

export interface Frontmatter {
  icon: string;
  title: string;
	description: string;
	image: {
		url: string;
		alt: string;
	};
	publishedAt: {
		iso: string;
		formated: string;
	};
	updatedAt?: {
		iso: string;
		formated: string;
		reason: string;
	}
}