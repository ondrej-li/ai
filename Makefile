PORT ?= 1313

.PHONY: dev build clean update-guidance

dev: ## Local live preview on http://127.0.0.1:1313
	hugo server --port $(PORT) --bind 127.0.0.1 --disableFastRender --renderToMemory

build: ## Production build into public/
	hugo --minify --cleanDestinationDir

clean: ## Remove generated output and build cache
	rm -rf public resources/_gen .hugo_build.lock

update-guidance: ## Refresh local copy of googlechrome/modern-web-guidance
	@tmp=$$(mktemp -d) && \
	git clone --depth 1 https://github.com/googlechrome/modern-web-guidance.git "$$tmp" && \
	sha=$$(git -C "$$tmp" rev-parse HEAD) && \
	rm -rf references/modern-web-guidance && \
	mkdir -p references/modern-web-guidance && \
	cp -a "$$tmp/." references/modern-web-guidance/ && \
	rm -rf references/modern-web-guidance/.git && \
	printf '%s\n' "$$sha" > references/modern-web-guidance/UPSTREAM_COMMIT && \
	rm -rf "$$tmp" && \
	echo "Updated references/modern-web-guidance to $$sha"
