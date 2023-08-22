import boto3
import botocore
import os
import uuid

# This file is to primarily help integrate AWS uploads with our Flask/React App

# Getting S3 credentials from .env
s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)


ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}
BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"


def get_unique_filename(filename):
    """ Creates unique filename for
   file uploaded to bucket """
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"

def upload_file_to_s3(file, acl="public-read"):
    """ Upload file to bucket. Returns url path and
      we will save in db if upload is successful """
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the our s3 upload fails
        return {"errors": str(e)}

   # URL saved in DB
    return {"url": f"{S3_LOCATION}{file.filename}"}

def remove_file_from_s3(image_url):
    # AWS needs the image file name, not the URL,
    # so we split that out of the URL
    key = image_url.rsplit("/", 1)[1]
    try:
        s3.delete_object(
        Bucket=BUCKET_NAME,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True
