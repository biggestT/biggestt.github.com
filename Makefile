SHELL=/bin/bash

help:
	@echo ""
	@echo "Developer/CI commands to manage the service"
	@echo ""
	@echo "make 			; serve page locally"

serve:
	bundle exec jekyll serve

.DEFAULT_GOAL := serve