FROM node

RUN npm install -g gulp

COPY entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh

RUN useradd -ms /bin/bash cli
RUN usermod -u 1000 cli
RUN mkdir -p /data

RUN chown 1000:1000 /data
RUN chown -R 1000:1000 /data

WORKDIR /data

CMD ["bash"]

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
