#!/bin/sh

USERNAME=$1
PASSWORD=$2

echo "First arg: $USERNAME"
echo "Second arg: $PASSWORD"

echo "$PASSWORD" | ssh "$USERNAME"@gps.gistda.org
